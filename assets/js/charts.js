/**
 * SchoolSyntaxERP — Charts.js
 * Chart.js configurations for dashboard analytics
 */

'use strict';

const SS_CHART_COLORS = {
  primary:   '#6366F1',
  secondary: '#8B5CF6',
  accent:    '#06B6D4',
  success:   '#10B981',
  warning:   '#F59E0B',
  error:     '#EF4444',
  muted:     'rgba(156,163,175,0.4)',
};

const SS_CHART_DEFAULTS = {
  font: {
    family: "'Inter', sans-serif",
    size: 12,
  },
  color: '#9CA3AF',
  plugins: {
    legend: {
      labels: {
        color: '#9CA3AF',
        font: { family: "'Inter', sans-serif", size: 12 },
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
      },
    },
    tooltip: {
      backgroundColor: '#1A2236',
      titleColor: '#F9FAFB',
      bodyColor: '#9CA3AF',
      borderColor: 'rgba(99,102,241,0.2)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: { family: "'Inter', sans-serif", weight: '600' },
      bodyFont: { family: "'Inter', sans-serif" },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(99,102,241,0.06)', borderColor: 'transparent' },
      ticks: { color: '#6B7280', font: { family: "'Inter', sans-serif", size: 11 } },
    },
    y: {
      grid: { color: 'rgba(99,102,241,0.06)', borderColor: 'transparent' },
      ticks: { color: '#6B7280', font: { family: "'Inter', sans-serif", size: 11 } },
    },
  },
};

/**
 * Platform Growth Chart (Line)
 * Shows institution and student growth over time
 */
function initPlatformGrowthChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;

  const ctx = canvas.getContext('2d');

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient1.addColorStop(0, 'rgba(99,102,241,0.3)');
  gradient1.addColorStop(1, 'rgba(99,102,241,0)');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(139,92,246,0.2)');
  gradient2.addColorStop(1, 'rgba(139,92,246,0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Institutions',
          data: [180, 210, 245, 280, 310, 350, 385, 420, 455, 480, 510, 538],
          borderColor: SS_CHART_COLORS.primary,
          backgroundColor: gradient1,
          borderWidth: 2.5,
          pointBackgroundColor: SS_CHART_COLORS.primary,
          pointBorderColor: '#111827',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Students (×1000)',
          data: [650, 780, 910, 1050, 1180, 1320, 1450, 1590, 1720, 1840, 1960, 2100],
          borderColor: SS_CHART_COLORS.secondary,
          backgroundColor: gradient2,
          borderWidth: 2.5,
          pointBackgroundColor: SS_CHART_COLORS.secondary,
          pointBorderColor: '#111827',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        ...SS_CHART_DEFAULTS.plugins,
        legend: SS_CHART_DEFAULTS.plugins.legend,
      },
      scales: SS_CHART_DEFAULTS.scales,
    },
  });
}

/**
 * Module Usage Chart (Doughnut)
 * Shows which modules are most actively used
 */
function initModuleUsageChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;

  return new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: [
        'Academics',
        'Finance',
        'Admissions',
        'Attendance',
        'Communication',
        'HR & Payroll',
        'Examinations',
        'Others',
      ],
      datasets: [
        {
          data: [22, 18, 15, 14, 11, 9, 7, 4],
          backgroundColor: [
            '#6366F1',
            '#8B5CF6',
            '#06B6D4',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#EC4899',
            'rgba(156,163,175,0.4)',
          ],
          borderColor: '#111827',
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        ...SS_CHART_DEFAULTS.plugins,
        legend: {
          position: 'right',
          labels: {
            ...SS_CHART_DEFAULTS.plugins.legend.labels,
          },
        },
      },
    },
  });
}

/**
 * Student Enrollment Chart (Bar)
 * Shows enrollment by institution type
 */
function initEnrollmentChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;

  const ctx = canvas.getContext('2d');

  const gradientBar1 = ctx.createLinearGradient(0, 0, 0, 250);
  gradientBar1.addColorStop(0, '#6366F1');
  gradientBar1.addColorStop(1, '#4F46E5');

  const gradientBar2 = ctx.createLinearGradient(0, 0, 0, 250);
  gradientBar2.addColorStop(0, '#8B5CF6');
  gradientBar2.addColorStop(1, '#7C3AED');

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['K-12', 'Higher Ed', 'Vocational', 'Religious', 'International', 'Govt'],
      datasets: [
        {
          label: 'Institutions',
          data: [215, 130, 85, 62, 28, 18],
          backgroundColor: gradientBar1,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 28,
        },
        {
          label: 'Avg Students (×100)',
          data: [8, 42, 3, 6, 12, 95],
          backgroundColor: gradientBar2,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 28,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: SS_CHART_DEFAULTS.plugins,
      scales: {
        ...SS_CHART_DEFAULTS.scales,
        x: {
          ...SS_CHART_DEFAULTS.scales.x,
          stacked: false,
        },
        y: {
          ...SS_CHART_DEFAULTS.scales.y,
          beginAtZero: true,
        },
      },
    },
  });
}

/**
 * Uptime Reliability Chart (Area Line)
 * Shows platform uptime over 12 months
 */
function initUptimeChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;

  const ctx = canvas.getContext('2d');

  const gradientArea = ctx.createLinearGradient(0, 0, 0, 200);
  gradientArea.addColorStop(0, 'rgba(16,185,129,0.3)');
  gradientArea.addColorStop(1, 'rgba(16,185,129,0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Uptime %',
          data: [99.95, 99.98, 99.99, 99.97, 99.99, 99.99, 99.98, 99.99, 99.99, 99.97, 99.99, 99.99],
          borderColor: SS_CHART_COLORS.success,
          backgroundColor: gradientArea,
          borderWidth: 2.5,
          pointBackgroundColor: SS_CHART_COLORS.success,
          pointBorderColor: '#111827',
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        ...SS_CHART_DEFAULTS.plugins,
        legend: { display: false },
      },
      scales: {
        x: SS_CHART_DEFAULTS.scales.x,
        y: {
          ...SS_CHART_DEFAULTS.scales.y,
          min: 99.9,
          max: 100,
          ticks: {
            ...SS_CHART_DEFAULTS.scales.y.ticks,
            callback: (v) => v + '%',
          },
        },
      },
    },
  });
}

/**
 * Revenue / Subscription Growth (Area)
 */
function initRevenueChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;

  const ctx = canvas.getContext('2d');

  const g1 = ctx.createLinearGradient(0, 0, 0, 250);
  g1.addColorStop(0, 'rgba(245,158,11,0.3)');
  g1.addColorStop(1, 'rgba(245,158,11,0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
      datasets: [
        {
          label: 'MRR ($K)',
          data: [18, 28, 42, 65, 94, 138],
          borderColor: SS_CHART_COLORS.warning,
          backgroundColor: g1,
          borderWidth: 2.5,
          pointBackgroundColor: SS_CHART_COLORS.warning,
          pointBorderColor: '#111827',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        ...SS_CHART_DEFAULTS.plugins,
        legend: { display: false },
      },
      scales: {
        x: SS_CHART_DEFAULTS.scales.x,
        y: {
          ...SS_CHART_DEFAULTS.scales.y,
          beginAtZero: true,
          ticks: {
            ...SS_CHART_DEFAULTS.scales.y.ticks,
            callback: (v) => '$' + v + 'K',
          },
        },
      },
    },
  });
}

/* ─── Auto-Initialize Charts on DOMContentLoaded ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPlatformGrowthChart('chart-growth');
  initModuleUsageChart('chart-modules');
  initEnrollmentChart('chart-enrollment');
  initUptimeChart('chart-uptime');
  initRevenueChart('chart-revenue');
});
